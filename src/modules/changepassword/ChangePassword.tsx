import FormInput from "@/src/components/form/inputs/FormInput";
import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { useChangePassword } from "@/src/hooks/useChangePassword";
import { useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";


type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function ChangePasswordScreen() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const changePassword = useChangePassword();

    const onSubmit = (values: FormValues) => {
        if (values.newPassword !== values.confirmPassword)
            return alert("Passwords do not match");

        if (values.oldPassword === values.newPassword)
            return alert("New password must be different");

        changePassword.mutate(
            {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            },
            { onSuccess: () => reset() }
        );
    };

    return (
        <View className="flex-1 bg-light px-4">
            <BackHeader
                title="Change Password"
                desc="Update your account password securely"
            />

            <View className="bg-light rounded-2xl p-4">

                <FormInput
                    control={control}
                    name="oldPassword"
                    label="Current Password"
                    type="password"
                    error={errors?.oldPassword}
                />

                <FormInput
                    control={control}
                    name="newPassword"
                    label="New Password"
                    type="password"
                    error={errors?.newPassword}
                />

                <FormInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    error={errors?.confirmPassword}
                />

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={changePassword.isPending}
                    className="bg-primary py-3 rounded-2xl mt-2 items-center"
                    activeOpacity={0.8}
                >
                    {changePassword.isPending ? (
                        <ActivityIndicator color={colors.light} />
                    ) : (
                        <CsText className="text-light font-medium">
                            Change Password
                        </CsText>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
