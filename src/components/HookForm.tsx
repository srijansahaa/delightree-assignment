import { FieldErrors, Resolver, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Box,
  InputGroup,
  InputRightElement,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./Form.css";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

type FormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  date: string;
  stackText: string;
  stack: string[];
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: FieldErrors<FormValues> = {};

  if (!values.firstName) {
    errors.firstName = {
      type: "required",
      message: "First name is required.",
    };
  }

  if (!values.lastName) {
    errors.lastName = {
      type: "required",
      message: "Last name is required.",
    };
  }

  if (!values.gender) {
    errors.gender = {
      type: "required",
      message: "Gender is required.",
    };
  }

  if (!values.date) {
    errors.date = {
      type: "required",
      message: "Date is required.",
    };
  }

  if (!values.stackText) {
    errors.stackText = {
      type: "required",
      message: "Tech Stack is required.",
    };
  }
  if (!values.stack) {
    errors.stack = {
      type: "required",
      message: "Tech Stack is required.",
    };
  }
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors: errors,
  };
};

export default function HookForm() {
  const [inputValues, setInputValues] = useState<FormValues>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      date: "",
      stackText: "",
      stack: [],
    },
  });

  const [stackList, setStackList] = useState<string[]>([]);

  const handleFormValidation = (data: FormValues) => {
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
      setInputValues(data);
    }, 3000);
  };

  const updateStack = () => {
    const values = getValues();
    const stackArray = Array.isArray(values.stack) ? values.stack : [];

    const newTechSkill = values.stackText.trim();
    if (newTechSkill) {
      setValue("stack", [...stackArray, newTechSkill]);
      setStackList([...stackArray, newTechSkill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const values = getValues();
    const stackArray = Array.isArray(values.stack) ? values.stack : [];
    const updatedStack = stackArray.filter(
      (skill: string) => skill !== skillToRemove
    );
    setValue("stack", updatedStack);
    setStackList(updatedStack);
  };

  useEffect(() => setStackList(getValues("stack")), [getValues("stack")]);

  return (
    <>
      <form onSubmit={handleSubmit((data) => handleFormValidation(data))}>
        <div className="mainForm">
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input
              id="firstName"
              placeholder="Enter First Name"
              {...register("firstName", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel htmlFor="name">Last name</FormLabel>
            <Input
              id="lastName"
              placeholder="Enter Last Name"
              {...register("lastName", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.gender}>
            <FormLabel htmlFor="name">Gender</FormLabel>
            <Select
              id="gender"
              placeholder="Select Gender"
              {...register("gender", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            >
              <option value="male">Male</option>
              <option value="femaile">Female</option>
              <option value="other">Other</option>
            </Select>
            <FormErrorMessage>
              {errors.gender && errors.gender.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.date}>
            <FormLabel htmlFor="name">Date of Birth</FormLabel>
            <Input
              id="date"
              placeholder="Enter your DoB"
              {...register("date", {
                required: "This is required",
              })}
              type="date"
            />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.stackText}>
            <FormLabel htmlFor="name">Tech Stack</FormLabel>
            <InputGroup>
              <Input
                id="stackText"
                placeholder="Add Tech Skills"
                {...register("stackText", {
                  required: "This is required",
                })}
              />
              <InputRightElement>
                <Button onClick={updateStack}>
                  <AddIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.stackText && errors.stackText.message}
            </FormErrorMessage>

            <ul>
              {stackList?.map((skill, index) => (
                <InputGroup key={index}>
                  <Input value={skill} disabled />
                  <InputRightElement>
                    <Button onClick={() => removeSkill(skill)}>
                      <CloseIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ))}
            </ul>
          </FormControl>
        </div>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting || showSpinner}
          type="submit"
        >
          Submit
        </Button>
      </form>

      {inputValues && (
        <div className="response">
          <Box>
            <Card variant={"elevated"}>
              <CardBody>
                <Text>
                  <b>First Name</b>: {inputValues.firstName}
                </Text>
              </CardBody>
            </Card>
          </Box>
          <Box>
            <Card variant={"elevated"}>
              <CardBody>
                <Text>
                  <b>Last Name</b>: {inputValues.lastName}
                </Text>
              </CardBody>
            </Card>
          </Box>
          <Box>
            <Card variant={"elevated"}>
              <CardBody>
                <Text>
                  <b>Gender</b>: {inputValues.gender}
                </Text>
              </CardBody>
            </Card>
          </Box>
          <Box>
            <Card variant={"elevated"}>
              <CardBody>
                <Text>
                  <b>Date of Birth</b>: {inputValues.date}
                </Text>
              </CardBody>
            </Card>
          </Box>
          <Box>
            <Card variant={"elevated"}>
              <CardBody>
                <Text>
                  <b>Tech Stack</b>:{" "}
                  {inputValues.stack.map((skill, index) => (
                    <span key={index}>
                      {skill}
                      {index < inputValues.stack.length - 1 && ", "}
                    </span>
                  ))}
                </Text>
              </CardBody>
            </Card>
          </Box>
        </div>
      )}
    </>
  );
}
