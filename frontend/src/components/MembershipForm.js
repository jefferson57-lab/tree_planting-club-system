import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createMembership } from '../api';
import * as Yup from 'yup';

function MembershipForm({ clubId, onMembershipCreated }) {
  const initialValues = {
    role: 'member'
  };

  const validationSchema = Yup.object({
    role: Yup.string().oneOf(['member', 'organizer'], 'Invalid role')
  });

  const handleSubmit = async (values, { resetForm }) => {
    const user_id = localStorage.getItem("user_id");
    await createMembership({ ...values, club_id: clubId, user_id: Number(user_id) });
    alert('Membership created!');
    resetForm();
    if (onMembershipCreated) onMembershipCreated();
  };

  return (
    <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
      <Form>
        <label>Role:
          <Field as="select" name="role">
            <option value="member">Member</option>
            <option value="organizer">Organizer</option>
          </Field>
        </label>
        <ErrorMessage name="role" component="div" />

        <button type="submit">Join Club</button>
      </Form>
    </Formik>
  );
}

export default MembershipForm;
