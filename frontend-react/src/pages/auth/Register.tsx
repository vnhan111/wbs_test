import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { AuthService } from "../../service/authService";
import type { RegisterRequest } from "../../api/authAPI";
import { Button, Form, Input, Card, message } from 'antd';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterRequest>({
    loginName: "",
    memberFullName: "",
    email: "",
    passWord: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    if (formData.passWord !== confirmPassword) {
      message.error("Confirm password does not match!");
      return;
    }

    setLoading(true);

    const result = await AuthService.register(formData);

    setLoading(false);

    if (result.success) {
      message.success("Registration successful!");
      navigate("/login");
    } else {
      message.error(result.error || "Registration failed. Please try again!");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordConfirmVisibilityToggle = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mr-[750px] mt-[-20px]">
      <img
        src="/Picture1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-[106%]"
      />
      <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl !bg-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-2">
          Register WBBBSSS System
        </h2>
        <br></br>

        <Form className="space-y-4" onFinish={handleSubmit}>
          <div className="space-y-1">
            <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
              Email <span className="text-red-600 ml-1">*</span>
            </Form.Item>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
              Full Name <span className="text-red-600 ml-1">*</span>
            </Form.Item>
            <Input
              type="text"
              name="memberFullName"
              value={formData.memberFullName}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
              Username <span className="text-red-600 ml-1">*</span>
            </Form.Item>
            <Input
              type="text"
              name="loginName"
              value={formData.loginName}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <Form.Item className="flex items-center text-sm font-medium text-gray-700 mb-[-5px]">
              Password <span className="text-red-600 ml-1">*</span>
            </Form.Item>
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                name="passWord"
                value={formData.passWord}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />

              <button
                type="button"
                onClick={handlePasswordVisibilityToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {passwordVisible ? (
                  <EyeInvisibleOutlined className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOutlined className="h-5 w-5" aria-hidden="true" />
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
                type={passwordConfirmVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Enter confirm password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />

              <button
                type="button"
                onClick={handlePasswordConfirmVisibilityToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {passwordConfirmVisible ? (
                  <EyeInvisibleOutlined className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOutlined className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Button
            htmlType="submit"
            disabled={loading}
            className="w-full bg-green-400 text-white font-semibold py-6 rounded-lg hover:!bg-green-500 hover:!text-white transition duration-200 shadow-md hover:shadow-lg disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>
        <br />
        <hr className="border-t-2 border-gray-300" />
        <br />
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;