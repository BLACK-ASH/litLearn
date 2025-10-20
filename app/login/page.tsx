import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/login/components/LoginForm";
import { RegisterForm } from "@/features/login/components/RegisterForm";
import { auth } from "@/lib/Auth/auth";
// path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session) {
    redirect("/");
  }
  return (
    <Tabs
      defaultValue="login"
      className="max-w-[500px] min-h-[calc(100vh-165px)] pt-32 mt-16 p-2 mx-auto"
    >
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};

export default page;
