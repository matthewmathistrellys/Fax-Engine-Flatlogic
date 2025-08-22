import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/faxes/faxesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const FaxesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { faxes } = useAppSelector((state) => state.faxes)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View faxes')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View faxes')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/faxes/faxes-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Sender</p>
                    <p>{faxes?.sender}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Receiver</p>
                    <p>{faxes?.receiver}</p>
                </div>

                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={faxes?.summary} />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>DocumentType</p>
                    <p>{faxes?.document_type ?? 'No data'}</p>
                </div>

                <FormField label='Urgent'>
                    <SwitchField
                      field={{name: 'urgent', value: faxes?.urgent}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Company</p>

                        <p>{faxes?.company?.name ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>User</p>

                        <p>{faxes?.user?.firstName ?? 'No data'}</p>

                </div>

                <FormField label='ReceivedAt'>
                    {faxes.received_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={faxes.received_at ?
                        new Date(
                          dayjs(faxes.received_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No ReceivedAt</p>}
                </FormField>

                <FormField label='ProcessedAt'>
                    {faxes.processed_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={faxes.processed_at ?
                        new Date(
                          dayjs(faxes.processed_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No ProcessedAt</p>}
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>companies</p>

                        <p>{faxes?.companies?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Alerts Fax</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>AlertType</th>

                            </tr>
                            </thead>
                            <tbody>
                            {faxes.alerts_fax && Array.isArray(faxes.alerts_fax) &&
                              faxes.alerts_fax.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/alerts/alerts-view/?id=${item.id}`)}>

                                    <td data-label="alert_type">
                                        { item.alert_type }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!faxes?.alerts_fax?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/faxes/faxes-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

FaxesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default FaxesView;
