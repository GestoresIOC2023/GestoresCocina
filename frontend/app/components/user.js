"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function UserPage({ user_id, nickname, profile_picture }) {
  const [previewImage, setPreviewImage] = useState(profile_picture);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  watch((data, { name }) => {
    if (name === "photo") {
      const file = data[name][0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    if (data.photo[0]){
      formData.append("file", data.photo[0]);
    }else{
      formData.append("profile_picture", profile_picture);
    }
    formData.append("nickname", data.nickname);
    formData.append("description", data.description);
    await fetch("/api/update/user", {
      method: "PUT",
      body: formData,
    });
  };

  return (
    <form
      className="flex flex-col h-screen p-5 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="md:w-[640px]">
        <h1 className="text-center text-3xl p-4">Area personal</h1>
        <div className="flex flex-col border gap-4 border-1 p-2">
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <Image
                className="rounded-full object-cover"
                fill
                alt="Imagen"
                src={previewImage}
              ></Image>
            </div>
          </div>
          <div className="flex justify-center">
            <label
              className="text-lg bg-blue-400 rounded-md px-3 py-1"
              htmlFor="avatar"
            >
              <span className="px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </span>
              Subir foto
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              {...register("photo")}
            />
          </div>
        </div>
        <div className="py-4">
          <label className="text-lg block py-2" htmlFor="usuario">
            Usuario:
          </label>
          <input
            id="avatar"
            className="border-b-2 w-full px-2 py-2 text-lg focus:border-b-2 focus:border-gray-400 outline-none"
            type="text"
            placeholder="Nombre usuario"
            defaultValue={nickname}
            {...register("nickname", { required: true })}
          />
          {errors.nickname && <span>Este campo es requerido</span>}
        </div>
        <div className="py-4">
          <label className="text-lg block py-2" htmlFor="usuario">
            Descripción:
          </label>
          <textarea
            id="avatar"
            className="border h-52 w-full px-2 py-2 text-lg focus:border-2 focus:border-gray-400 outline-none"
            type="te"
            placeholder="Descripcion"
            defaultValue={""}
            {...register("description")}
          />
        </div>
        <input
          className="bg-green-400 px-4 py-1 rounded-md"
          type="submit"
          value="Guardar"
        />
      </div>
    </form>
  );
}
