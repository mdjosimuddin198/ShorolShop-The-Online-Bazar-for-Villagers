"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Contact = () => {
  const [selectType, setSelectType] = useState("");
  const [fields, setFields] = useState([]);

  const addField = (e) => {
    e.preventDefault();
    if (!selectType) return;
    setFields([...fields, { type: selectType, value: "" }]);
    setSelectType("");
  };

  const handleRemove = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleChange = (index, e) => {
    const updated = [...fields];
    updated[index].value = e.target.value;
    setFields(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    console.log("form data ", fields);
  };
  return (
    <>
      <form className="w-3/4  mx-auto p-4 space-y-2">
        <select
          className="w-full outline"
          onChange={(e) => {
            setSelectType(e.target.value);
          }}
          value={selectType}
          name="select"
          id="options"
        >
          <option value="">-- Select Field Type --</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="select">Select</option>
        </select>
        <Button onClick={addField} variant="ghost">
          Add Field
        </Button>
      </form>
      {/* daynamic form */}
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mx-auto p-4 space-y-2 border-t mt-4"
      >
        {fields.map((filed, i) => (
          <div key={i}>
            {filed.type === "select" ? (
              <div className="flex items-center justify-evenly">
                <select
                  className="w-full outline"
                  value={filed.value}
                  type={filed.value}
                  onChange={(e) => {
                    handleChange(i, e);
                  }}
                  name="select"
                  id="options"
                >
                  <option value="">select</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="select">Select</option>
                </select>
                <Button
                  onClick={() => {
                    handleRemove(i);
                  }}
                  variant="destructive"
                >
                  ❌
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-evenly">
                <input
                  type={filed.type}
                  onChange={(e) => {
                    handleChange(i, e);
                  }}
                  className="w-full border p-2"
                  placeholder={`Enter ${filed.type}`}
                />
                <Button
                  onClick={() => {
                    handleRemove(i);
                  }}
                  variant="distract"
                >
                  ❌
                </Button>
              </div>
            )}
          </div>
        ))}
        {fields.length > 0 && (
          <>
            <Button variant="secondary">Submit</Button>
          </>
        )}
      </form>
    </>
  );
};

export default Contact;
