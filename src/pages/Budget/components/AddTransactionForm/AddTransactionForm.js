import React, { useMemo } from "react";
import { Form, Field } from "react-final-form";
import { groupBy, noop } from "lodash";

const required = (value) => (value ? undefined : "This Field is Required");

function AddTransactionForm({ onSubmit = noop, categories }) {
  const groupedCategoriesByParentName = groupBy(
    categories,
    "parentCategory.name"
  );
  const categoryItems = useMemo(
    () =>
      Object.entries(groupedCategoriesByParentName).map(
        ([parentName, categories]) => (
          <optgroup key={parentName} label={parentName}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
        )
      ),
    [groupedCategoriesByParentName]
  );
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="description" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Description</label>
                <input {...input} type="text" placeholder="Description" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            parse={(value) => parseFloat(value, 10)}
            name="amount"
            validate={required}
          >
            {({ input, meta }) => (
              <div>
                <label>Amount</label>
                <input
                  {...input}
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="categoryId" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Category</label>
                <select {...input}>{categoryItems}</select>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="date" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Date</label>
                <input {...input} type="date" placeholder="Date" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
}

export default AddTransactionForm;
