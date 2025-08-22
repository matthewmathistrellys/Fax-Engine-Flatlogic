import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/faxes/faxesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    sender: '',

    receiver: '',

    summary: '',

    document_type: 'medical',

    urgent: false,

    company: '',

    user: '',

    received_at: '',

    processed_at: '',

    companies: '',

}

const FaxesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/faxes/faxes-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
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

  <FormField label="Company" labelFor="company">
      <Field name="company" id="company" component={SelectField} options={[]} itemRef={'companies'}></Field>
  </FormField>

  <FormField label="User" labelFor="user">
      <Field name="user" id="user" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField
      label="ReceivedAt"
  >
      <Field
          type="datetime-local"
          name="received_at"
          placeholder="ReceivedAt"
      />
  </FormField>

  <FormField
      label="ProcessedAt"
  >
      <Field
          type="datetime-local"
          name="processed_at"
          placeholder="ProcessedAt"
      />
  </FormField>

  <FormField label="companies" labelFor="companies">
      <Field name="companies" id="companies" component={SelectField} options={[]} itemRef={'companies'}></Field>
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

FaxesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default FaxesNew
