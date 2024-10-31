import { NextResponse } from "next/server"

export function getEnvVariable(key) {
  const value = process.env[key]

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`)
    throw new Error(`The environment variable ${key} is not set.`)
  }

  return value
}

export function getErrorResponse(status = 500, message, errors = null) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null
    }),
    {
      status,
      headers: { "Content-Type": "application/json" }
    }
  )
}
