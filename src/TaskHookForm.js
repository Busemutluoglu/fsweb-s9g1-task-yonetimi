import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import "react-toastify/dist/ReactToastify.css";

let renderCount = 0;

function TaskHookForm(props) {
  const notify = () => toast("Kayıt işlemi tamamlandı!");
  const { kisiler, submitFn } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  renderCount++;

  const onSubmit = (formData) => {
    console.log(formData);
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
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
        {errors.title && (
          <p className="input-error">{errors?.title?.message}</p>
        )}
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
      {errors.description && (
        <p className="input-error"> {errors?.description?.message}</p>
      )}

      <div className="form-line">
        <label className="input-label">İnsanlar</label>

        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  required: {
                    value: true,
                    message: "En az 1 kişi seçin",
                  },

                  validate: {
                    maxKisi: (kisiler) =>
                      kisiler.length <= 3 || "en fazla 3 kişi seçin",
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors?.people?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          onClick={notify}
          type="submit"
          disabled={!isValid}>
          {" "}
          Gönder{" "}
        </button>
        <ToastContainer />
      </div>
    </form>
  );
}

export default TaskHookForm;
