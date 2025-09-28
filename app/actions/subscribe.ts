"use server"

import { createClient } from "@/lib/supabase/server"

export type SubscriptionFormState = {
  status: "idle" | "success" | "error"
  message: string
}

const EMAIL_REGEX =
  /^(?:[a-zA-Z0-9_'^&+{}=!?$%#`~|-]+(?:\.[a-zA-Z0-9_'^&+{}=!?$%#`~|-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/

export async function subscribe(
  _prevState: SubscriptionFormState,
  formData: FormData
): Promise<SubscriptionFormState> {
  const rawEmail = formData.get("email")

  if (typeof rawEmail !== "string" || rawEmail.trim().length === 0) {
    return {
      status: "error",
      message: "Укажите адрес электронной почты, чтобы оформить подписку.",
    }
  }

  const email = rawEmail.trim().toLowerCase()

  if (!EMAIL_REGEX.test(email)) {
    return {
      status: "error",
      message: "Похоже, адрес введён неверно. Попробуйте ещё раз.",
    }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from("email_subscribers")
    .insert({ email })

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        message: "Вы уже в списке. Скоро свяжемся!",
      }
    }

    return {
      status: "error",
      message: "Что-то пошло не так на нашей стороне. Повторите попытку позже.",
    }
  }

  return {
    status: "success",
    message: "Вы в деле! Мы напишем вам, как только Вайбкурсы откроются.",
  }
}
