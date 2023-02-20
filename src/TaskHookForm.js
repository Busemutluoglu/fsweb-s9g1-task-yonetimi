import React from "react";
import { useForm, Controller } from "react-hook-form";

let renderCount = 0;

function TaskHookForm(props) {
  const { kisiler, submitFn, tasks } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  renderCount++;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}></textarea>
      </div>
      {errors.description && <p>{errors.description.message}</p>}

      <div className="form-line">
        <label className="input-label">İnsanlar</label>

        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              {p}
              <input
                type="checkbox"
                name="people"
                {...register("isim", {
                  value: true,
                  message: "En fazla 3 kişi seçebilirsiniz",
                })}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="form-line">
        <button type="submit" disabled={!isValid}>
          Gönder
        </button>
      </div>
    </form>
  );
}

export default TaskHookForm;
