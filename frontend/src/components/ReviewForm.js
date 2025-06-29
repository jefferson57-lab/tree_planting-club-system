import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createReview } from '../api';
import * as Yup from 'yup';

function ReviewForm({ eventId }) {
  const initialValues = {
    rating: 5,
    comment: ''
  };

  const validationSchema = Yup.object({
    rating: Yup.number().min(1).max(5).required(),
    comment: Yup.string().required('Comment is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    const user_id = localStorage.getItem("user_id");
    await createReview({ ...values, event_id: eventId, user_id: Number(user_id) });
    alert('Review submitted!');
    resetForm();
  };

  return (
    <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
      <Form>
        <label>Rating:
          <Field as="select" name="rating">
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Field>
        </label>
        <ErrorMessage name="rating" component="div" />

        <label>Comment:<br />
          <Field name="comment" as="textarea" rows="4" />
        </label>
        <ErrorMessage name="comment" component="div" />

        <button type="submit">Submit Review</button>
      </Form>
    </Formik>
  );
}

export default ReviewForm;
