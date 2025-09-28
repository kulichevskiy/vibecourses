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
      message: "Please enter an email address before subscribing.",
    }
  }

  const email = rawEmail.trim().toLowerCase()

  if (!EMAIL_REGEX.test(email)) {
    return {
      status: "error",
      message: "That doesn\u2019t look like a valid email. Try again?",
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
        message: "You\u2019re already on the list. Stay tuned!",
      }
    }

    return {
      status: "error",
      message: "Something went wrong on our side. Please try again soon.",
    }
  }

  return {
    status: "success",
    message: "You\u2019re in! We\u2019ll email you as soon as VibeCourses is live.",
  }
}
