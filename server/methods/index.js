import accountLoginWithTel from './account_login_with_tel';
import agreePointApply from './agree_point_apply';
import uploadBannerThumb from './upload_banner_thumb';
import uploadDiscuzThumb from './upload_discuz_thumb';
import passTheMemberVaild from './pass_the_member_vaild';
import setTheMemberMaster from './set_the_member_master';
import saveUserInfo from './save_user_info';
import uploadNewsThumb from './upload_news_thumb';
import notifyReferral from './notify_referral';
import uploadRecordsTablesThumb from './upload_records_tables_thumb';
import uploadhospitalThumb from './uploadhospital_thumb';
import getDoctorCert from './get_doctor_cert';
import Doctors from './doctors';
import wx from './wx';

export default function () {
  accountLoginWithTel();
  agreePointApply();
  uploadBannerThumb();
  uploadDiscuzThumb();
  passTheMemberVaild();
  setTheMemberMaster();
  saveUserInfo();
  uploadNewsThumb();
  notifyReferral();
  uploadRecordsTablesThumb();
  uploadhospitalThumb();
  getDoctorCert();
  Doctors();
  wx();
}
