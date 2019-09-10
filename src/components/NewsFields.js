import React from 'react';
import {Field} from 'redux-form';
import InputField from './InputField';
import TextArea from './TextArea';
import {required, minLength, maxLength} from './validation';

const NewsFields = () => (
  <div>
    <Field
      name="title"
      placeholder="Title"
      type="text"
      className="inputField"
      component={InputField}
      validate={[required, minLength, maxLength]}
    /><br />
    <Field
      name="author"
      placeholder="Author"
      type="text"
      className="inputField"
      component={InputField}
      validate={[required, minLength]}
    /><br />
    <Field
      name="description"
      placeholder="Description"
      type="text"
      className="inputField"
      component={InputField}
      validate={[required, minLength]}
    /><br />
    <Field
      name="urlToImage"
      placeholder="URL to image"
      type="url"
      className="inputField"
      component={InputField}
      validate={[required]}
    /><br />
    <Field
      name="publishedAt"
      type="date"
      className="inputField"
      component={InputField}
      validate={[required]}
    /><br />
    <Field
      name="content"
      placeholder="Content"
      component={TextArea}
      validate={[required, minLength]}
    />
  </div>
);

export default NewsFields;
