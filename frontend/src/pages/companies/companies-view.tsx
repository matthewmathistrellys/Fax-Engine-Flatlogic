import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/companies/companiesSlice'
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

const CompaniesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { companies } = useAppSelector((state) => state.companies)

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
              <title>{getPageTitle('View companies')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View companies')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/companies/companies-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{companies?.name}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Users Companies</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>First Name</th>

                                <th>Last Name</th>

                                <th>Phone Number</th>

                                <th>E-Mail</th>

                                <th>Disabled</th>

                            </tr>
                            </thead>
                            <tbody>
                            {companies.users_companies && Array.isArray(companies.users_companies) &&
                              companies.users_companies.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/users/users-view/?id=${item.id}`)}>

                                    <td data-label="firstName">
                                        { item.firstName }
                                    </td>

                                    <td data-label="lastName">
                                        { item.lastName }
                                    </td>

                                    <td data-label="phoneNumber">
                                        { item.phoneNumber }
                                    </td>

                                    <td data-label="email">
                                        { item.email }
                                    </td>

                                    <td data-label="disabled">
                                        { dataFormatter.booleanFormatter(item.disabled) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!companies?.users_companies?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Alerts companies</p>
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
                            {companies.alerts_companies && Array.isArray(companies.alerts_companies) &&
                              companies.alerts_companies.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/alerts/alerts-view/?id=${item.id}`)}>

                                    <td data-label="alert_type">
                                        { item.alert_type }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!companies?.alerts_companies?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Faxes Company</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Sender</th>

                                <th>Receiver</th>

                                <th>Summary</th>

                                <th>DocumentType</th>

                                <th>Urgent</th>

                                <th>ReceivedAt</th>

                                <th>ProcessedAt</th>

                            </tr>
                            </thead>
                            <tbody>
                            {companies.faxes_company && Array.isArray(companies.faxes_company) &&
                              companies.faxes_company.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/faxes/faxes-view/?id=${item.id}`)}>

                                    <td data-label="sender">
                                        { item.sender }
                                    </td>

                                    <td data-label="receiver">
                                        { item.receiver }
                                    </td>

                                    <td data-label="summary">
                                        { item.summary }
                                    </td>

                                    <td data-label="document_type">
                                        { item.document_type }
                                    </td>

                                    <td data-label="urgent">
                                        { dataFormatter.booleanFormatter(item.urgent) }
                                    </td>

                                    <td data-label="received_at">
                                        { dataFormatter.dateTimeFormatter(item.received_at) }
                                    </td>

                                    <td data-label="processed_at">
                                        { dataFormatter.dateTimeFormatter(item.processed_at) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!companies?.faxes_company?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Faxes companies</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Sender</th>

                                <th>Receiver</th>

                                <th>Summary</th>

                                <th>DocumentType</th>

                                <th>Urgent</th>

                                <th>ReceivedAt</th>

                                <th>ProcessedAt</th>

                            </tr>
                            </thead>
                            <tbody>
                            {companies.faxes_companies && Array.isArray(companies.faxes_companies) &&
                              companies.faxes_companies.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/faxes/faxes-view/?id=${item.id}`)}>

                                    <td data-label="sender">
                                        { item.sender }
                                    </td>

                                    <td data-label="receiver">
                                        { item.receiver }
                                    </td>

                                    <td data-label="summary">
                                        { item.summary }
                                    </td>

                                    <td data-label="document_type">
                                        { item.document_type }
                                    </td>

                                    <td data-label="urgent">
                                        { dataFormatter.booleanFormatter(item.urgent) }
                                    </td>

                                    <td data-label="received_at">
                                        { dataFormatter.dateTimeFormatter(item.received_at) }
                                    </td>

                                    <td data-label="processed_at">
                                        { dataFormatter.dateTimeFormatter(item.processed_at) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!companies?.faxes_companies?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/companies/companies-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CompaniesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default CompaniesView;
