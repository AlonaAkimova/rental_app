import React from "react";
import { Input } from "@mui/base/Input";
import { FormControl } from "@mui/base/FormControl";
import Image from "next/image";
const RegisterPage: React.FC = () => {
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <FormControl className="block max-w-xs mx-auto">
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={"/google-icon.png"} alt={""} width={24} height={32} />
          Login with Google
        </button>
      </FormControl>
    </section>
  );
};

export default RegisterPage;
