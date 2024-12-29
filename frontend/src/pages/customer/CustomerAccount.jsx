import { Checkbox, Form, Input, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { userService } from "../../services/userService";

const CustomerAccount = () => {
 const [componentDisabled, setComponentDisabled] = useState(true);
 const [updateMessage, setUpdateMessage] = useState(null);

 const [profile, setProfile] = useState(null);
 const [form] = Form.useForm();
 const divRef = useRef(null);
 const notiRef = useRef(null);
 useEffect(() => {
  const fetchProfile = async () => {
   const response = await userService.getUserProfile(
    localStorage.getItem("token")
   );
   console.log(response);
   setProfile(response);
   form.setFieldsValue(response);
  };
  fetchProfile();
 }, [form]);

 const handleSubmit = async (values) => {
  // Send updated data to the server (you'll need to implement this in your `userService`)
  console.log(values);
  const response = await userService.updateUserProfile(
   localStorage.getItem("token"),
   values
  );
  setProfile(response.updatedUser);
  setUpdateMessage("Ok");
  setComponentDisabled(true);
  await new Promise((resolve) => {
   setTimeout(resolve, 2000);
  });
  setUpdateMessage(null);
 };

 if (!profile) return null;

 return (
  <>
   {updateMessage && (
    <div className="fixed inset-0 bg-black bg-opacity-[0.1] z-40"></div>
   )}
   <div className="bg-slate-100 min-h-screen">
    {updateMessage && (
     <div
      ref={divRef}
      className=" shadow-lg ring-1 ring-black/5 rounded-lg fixed z-[100]  top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-fit border  py-4 space-y-2 bg-white font-medium text-sm"
     >
      <div className="text-center pt-3 pb-2 flex flex-col justify-center items-center px-8 text-lg">
       <img src="/navigation.png" className="w-52 h-52" alt="123" />
       <p>Your profile has been updated successfully!</p>
      </div>

      <div className="flex justify-center items-center pb-2 text-lg">
       <div
        ref={notiRef}
        className="text-white bg-green-500 px-12 py-2 rounded-lg cursor-pointer hover:bg-green-700 "
        onClick={() => setUpdateMessage(null)}
       >
        Ok
       </div>
      </div>
     </div>
    )}
    <div className="pt-12 px-40">
     <div className="bg-white p-8 rounded-lg shadow-md">
      <Checkbox
       checked={!componentDisabled}
       onChange={(e) => setComponentDisabled(!e.target.checked)}
      >
       Update profile
      </Checkbox>
      <Form
       layout="horizontal"
       form={form}
       disabled={componentDisabled}
       onFinish={handleSubmit}
       style={{
        maxWidth: 600,
       }}
       className="flex flex-col mt-4"
      >
       <Form.Item label="ID" name="id">
        <Input defaultValue={profile.id} disabled />
       </Form.Item>
       <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
       >
        <Input />
       </Form.Item>
       <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
       >
        <Input />
       </Form.Item>
       <Form.Item label="Birthday" name="birthday">
        <Input />
       </Form.Item>
       <Form.Item label="Region" name="region">
        <Input />
       </Form.Item>
       <Form.Item label="Role" name="role">
        <Input disabled />
       </Form.Item>
       <Form.Item>
        <Button type="primary" htmlType="submit" disabled={componentDisabled}>
         Update Profile
        </Button>
       </Form.Item>
      </Form>
     </div>
    </div>
   </div>
  </>
 );
};

export default CustomerAccount;
