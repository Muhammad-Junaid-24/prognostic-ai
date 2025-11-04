import React, { useState } from "react";
import { Input, Button, Form, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const Integration = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (!email) {
            message.error("Please enter a valid SMTP email.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            message.success("SMTP email saved successfully!");
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
            <Card style={{ width: 400, padding: 20, textAlign: "center", borderRadius: 10, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <h2>SMTP Email Integration</h2>
                <Form onFinish={handleSave}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                    >
                        <Input
                            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="Enter SMTP Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {email ? "Update Email" : "Save Email"}
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Integration;
