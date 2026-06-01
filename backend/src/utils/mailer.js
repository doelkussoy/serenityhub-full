const nodemailer = require('nodemailer');

/**
 * Membuat transporter Nodemailer menggunakan Gmail SMTP.
 * Membutuhkan GMAIL_USER dan GMAIL_PASS (App Password) di file .env
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/**
 * Mengirim email notifikasi laporan baru ke admin.
 * @param {Object} options - { to, reportTitle, reportCategory, reportDescription, reporterName, reportAddress }
 */
async function sendNewReportNotification(options) {
  const { to, reportTitle, reportCategory, reportDescription, reporterName, reportAddress } = options;

  const mailOptions = {
    from: `"SerenityHub" <${process.env.GMAIL_USER}>`,
    to,
    subject: `[SerenityHub] Laporan Baru: ${reportTitle}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 0; border-radius: 12px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 32px 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">SerenityHub</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Sistem Pelaporan Masyarakat</p>
        </div>
        
        <!-- Alert Banner -->
        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px 32px; display: flex; align-items: center;">
          <span style="font-size: 20px; margin-right: 10px;">🔔</span>
          <div>
            <p style="margin: 0; font-weight: 600; color: #1e40af; font-size: 14px;">NOTIFIKASI LAPORAN BARU</p>
            <p style="margin: 4px 0 0; color: #3b82f6; font-size: 13px;">Ada laporan baru yang memerlukan tindakan Anda</p>
          </div>
        </div>

        <!-- Content -->
        <div style="background: white; padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px 8px 0 0; border: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Judul Laporan</p>
                <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a; font-weight: 700;">${reportTitle}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: white; border: 1px solid #e2e8f0; border-top: none;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Kategori</p>
                <p style="margin: 4px 0 0;">
                  <span style="display: inline-block; background: #dbeafe; color: #1e40af; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px;">
                    ${reportCategory || 'Tidak Dikategorikan'}
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Dilaporkan Oleh</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #0f172a; font-weight: 500;">👤 ${reporterName || 'Pengguna Tidak Dikenal'}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: white; border: 1px solid #e2e8f0; border-top: none;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Lokasi Kejadian</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #0f172a; font-weight: 500;">📍 ${reportAddress || '-'}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Deskripsi</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #334155; line-height: 1.6;">${reportDescription || '-'}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <p style="margin: 0 0 16px; color: #64748b; font-size: 14px;">Silakan masuk ke dashboard untuk meninjau dan menindaklanjuti laporan ini.</p>
            <a href="${process.env.APP_URL || '#'}/dashboard" 
               style="display: inline-block; background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Lihat di Dashboard →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">
            Email ini dikirim otomatis oleh sistem SerenityHub. Jangan membalas email ini.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendNewReportNotification };
