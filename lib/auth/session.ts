import "server-only";

import { bookingIdentityProvider } from "../booking/services";

export interface PatientSession {
  subjectId: string;
  patientId: string | null;
  name: string | null;
  email: string | null;
}

export async function getSignedInPatientSession(): Promise<PatientSession | null> {
  const identity = await bookingIdentityProvider.getCurrentIdentity();

  if (!identity) {
    return null;
  }

  return {
    subjectId: identity.subjectId,
    patientId: identity.patientId,
    name: identity.profile.name,
    email: identity.profile.email,
  };
}
