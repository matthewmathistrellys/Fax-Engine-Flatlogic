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

import { update, fetch } from '../../stores/alerts/alertsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditAlertsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    user: null,

    alert_type: '',

    fax: null,

    companies: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { alerts } = useAppSelector((state) => state.alerts)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof alerts === 'object') {
      setInitialValues(alerts)
    }
  }, [alerts])

  useEffect(() => {
      if (typeof alerts === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (alerts)[el])
          setInitialValues(newInitialVal);
      }
  }, [alerts])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/alerts/alerts-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit alerts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit alerts'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

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

    <FormField label="AlertType" labelFor="alert_type">
        <Field name="alert_type" id="alert_type" component="select">

            <option value="all">all</option>

            <option value="urgent">urgent</option>

            <option value="none">none</option>

        </Field>
    </FormField>

  <FormField label='Fax' labelFor='fax'>
        <Field
            name='fax'
            id='fax'
            component={SelectField}
            options={initialValues.fax}
            itemRef={'faxes'}

            showField={'sender'}

        ></Field>
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
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/alerts/alerts-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditAlertsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditAlertsPage
