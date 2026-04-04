import { z } from "zod";

export const createAppointmentSchema = z.object({
  userId: z.string().uuid(),
  serviceType: z.string().min(1, "กรุณาเลือกประเภทบริการ"),
  appointmentDate: z.string().min(1, "กรุณาเลือกวันที่"),
  appointmentTime: z.string().min(1, "กรุณาเลือกเวลา"),
  notes: z.string().max(1000).optional(),
});
