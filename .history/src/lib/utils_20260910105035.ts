const { sessionClaims } = await auth()
const role = (sessionClaims?.metadata as { role: string })?.role;