import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/registrar.services";
import type { RegisterDto, RegisterResponse } from "../models/register.model";

export function useRegister() {
    return useMutation<RegisterResponse, Error, RegisterDto>({
        mutationFn: registerUser,
    });
}