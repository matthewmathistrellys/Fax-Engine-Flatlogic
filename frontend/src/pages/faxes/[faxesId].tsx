import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/faxes/faxesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditFaxes = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'sender': '',

    'receiver': '',

    summary: '',

    document_type: '',

    urgent: false,

    company: null,

    user: null,

    received_at: new Date(),

    processed_at: new Date(),

    companies: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { faxes } = useAppSelector((state) => state.faxes)

  const { faxesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: faxesId }))
  }, [faxesId])

  useEffect(() => {
    if (typeof faxes === 'object') {
      setInitialValues(faxes)
    }
  }, [faxes])

  useEffect(() => {
      if (typeof faxes === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (faxes)[el])

          setInitialValues(newInitialVal);
      }
  }, [faxes])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: faxesId, data }))
    await router.push('/faxes/faxes-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit faxes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit faxes'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="Sender"
    >
        <Field
            name="sender"
            placeholder="Sender"
        />
    </FormField>

    <FormField
        label="Receiver"
    >
        <Field
            name="receiver"
            placeholder="Receiver"
        />
    </FormField>

    <FormField label="Summary" hasTextareaHeight>
        <Field name="summary" as="textarea" placeholder="Summary" />
    </FormField>

    <FormField label="DocumentType" labelFor="document_type">
        <Field name="document_type" id="document_type" component="select">

            <option value="medical">medical</option>

            <option value="legal">legal</option>

            <option value="financial">financial</option>

            <option value="other">other</option>

        </Field>
    </FormField>

    <FormField label='Urgent' labelFor='urgent'>
        <Field
            name='urgent'
            id='urgent'
            component={SwitchField}
        ></Field>
    </FormField>

    <FormField label='Company' labelFor='company'>
        <Field
            name='company'
            id='company'
            component={SelectField}
            options={initialValues.company}
            itemRef={'companies'}

            showField={'name'}

        ></Field>
    </FormField>

    <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

      <FormField
          label="ReceivedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.received_at ?
                  new Date(
                      dayjs(initialValues.received_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'received_at': date})}
          />
      </FormField>

      <FormField
          label="ProcessedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.processed_at ?
                  new Date(
                      dayjs(initialValues.processed_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'processed_at': date})}
          />
      </FormField>

    <FormField label='companies' labelFor='companies'>
        <Field
            name='companies'
            id='companies'
            component={SelectField}
            options={initialValues.companies}
            itemRef={'companies'}

            showField={'name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/faxes/faxes-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditFaxes.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditFaxes
