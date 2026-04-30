import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // testing ke liye
      to: "lathershorabh@gmail.com", // yaha apna email daal
      subject: "New Form Submission 🚀",
      html: `
        <h2>New Driver Application</h2>
        <p><b>Vehicle Type:</b> ${body.vehicleType}</p>
        <p><b>Vehicle Number:</b> ${body.vehicleNumber}</p>
        <p><b>Van Insurance Start:</b> ${body.vanStartDate}</p>
        <p><b>Van Insurance End:</b> ${body.vanEndDate}</p>
        <p><b>Goods Insurance Start:</b> ${body.goodsStartDate}</p>
        <p><b>Goods Insurance End:</b> ${body.goodsEndDate}</p>
        <p><b>Liability Insurance Start:</b> ${body.liabilityStartDate}</p>
        <p><b>Liability Insurance End:</b> ${body.liabilityEndDate}</p>
      `,
    });

    return Response.json({ success: true, response });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
}
