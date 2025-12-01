import { useMutation } from "@tanstack/react-query";
import type { LoginDto, LoginResponse } from "../models/login.model";
import { loginUser } from "../services/login.services";

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginDto>({
        mutationFn: loginUser,
    });
}