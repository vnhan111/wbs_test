import React, { useState } from 'react';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react';
import { Button, Form, Input, Card} from 'antd';
const ResetPassword: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    }
    const handleConfirmPasswordVisibilityToggle = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 mr-[750px] mt-[-65px]">
            <img
                src="/Picture1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-[100%] -z-10"
            />
            <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl !bg-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-2">
                    Reset Password
                </h2>
                <br></br>
                <h1 className=" text-gray-600 mb-6 text-left">
                    Password requires 8 characters or more, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
                </h1>
                <br></br>
                <Form className="space-y-4">
                    <div className="space-y-1">
                        <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
                            Password <span className="text-red-600 ml-1">*</span>
                        </Form.Item>
                        <div className="relative">
                            <Input
                                type={passwordVisible ? "text" : "password"}
                                required
                                placeholder="Enter password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                            <button
                                onClick={handlePasswordVisibilityToggle}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            >
                                {passwordVisible ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
                            Confirm Password <span className="text-red-600 ml-1">*</span>
                        </Form.Item>
                        <div className="relative">
                            <Input
                                type={confirmPasswordVisible ? "text" : "password"}
                                required
                                placeholder="Enter confirm password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                            <button
                                onClick={handleConfirmPasswordVisibilityToggle}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            >
                                {confirmPasswordVisible ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button
                        htmlType="submit"
                        className="w-full bg-green-400 text-white font-bold py-6 rounded-lg hover:!bg-green-500 hover:!text-white transition duration-200 shadow-md hover:shadow-lg text-lg"
                    >
                        Change Password
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
export default ResetPassword;