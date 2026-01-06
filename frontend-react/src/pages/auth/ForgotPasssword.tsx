import type React from "react";
import { Link } from "react-router";
import { Button, Form, Input, Card} from 'antd';

const ForgotPassword: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 mr-[750px] mt-[-70px]">
            <img
                src="/Picture1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-[100%] -z-10"
            />
            <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl !bg-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-2">
                    Forgot Password
                </h2>
                <br></br>
                <h1 className=" text-gray-600 mb-6 text-left">
                    Please enter your email. The system will send you an email to change your password.
                </h1>
                <br></br>
                <Form className="space-y-4">
                    <div className="space-y-1">
                        <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
                            Recovery email <span className="text-red-600 ml-1">*</span>
                        </Form.Item>
                        <Input
                            type="email"
                            required
                            placeholder="Enter your recovery email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                    </div>
                    <Button
                        htmlType="submit"
                        className="w-full bg-green-400 text-white font-bold py-6 rounded-lg hover:!bg-green-500 hover:!text-white transition duration-200 shadow-md hover:shadow-lg text-lg"
                    >
                        Confirm forgot password
                    </Button>
                    <br></br>
                    <br></br>
                    <Link to="/login" className="font-semibold text-gray-600 hover:underline hover:text-green-600 text-sm mt-10">
                        Go back to Login
                    </Link>
                </Form>
            </Card>
        </div>
    );
}
export default ForgotPassword;