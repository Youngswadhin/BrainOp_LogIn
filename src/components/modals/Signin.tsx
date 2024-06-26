/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { authAtom, userAtom } from "../../atom/atom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signin() {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [password, setPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    // e.preventDefault();
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/user/login",
      formData,
      { withCredentials: true }
    );
    if (!res.data.status) {
      setUser(res.data.data);
      setAuth(true);
      return onClose();
    }
    toast(res.data.msg);
  };

  const onchange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Log In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hey Lets Scroll !
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  onChange={(e) => onchange("email", e.target.value)}
                  value={formData.email}
                />
                <Input
                  endContent={
                    password ? (
                      <FaLockOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    ) : (
                      <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    )
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type={password ? "text" : "password"}
                  variant="bordered"
                  className="border-white/20"
                  onChange={(e) => onchange("password", e.target.value)}
                  value={formData.password}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={login}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
