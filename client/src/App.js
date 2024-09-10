import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Header,
  HeaderBusiness,
  LoginBusiness,
  RegisterBusiness,
  RegisterSuccess,
  Partnership,
  PartnerAccount,
  PartnerHome,
  PartnerHeader,
  PartnerOrder,
  PartnerInsert,
  PartnerRevenue,
  PartnerOnProgress,
  PartnerRoom,
  PartnerInsertRoom,
  PartnerReview,
  DetailHotel,
  Admin,
  ShowAllHotel,
  Orders,
  Verified,
  VerifiedPart,
  ChangeInfoUser,
  BookingHistory,
  Favorite,
  Reviews,
  ShowReviews,
} from "./container/Public/index.js";
import { path } from "./ultils/constaint";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee);

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.HEADER} element={<Header />} />
        <Route path={path.BUSINESS} element={<HeaderBusiness />} />
        <Route path={path.LOGINBUSINESS} element={<LoginBusiness />} />
        <Route path={path.REGISTERBUSINESS} element={<RegisterBusiness />} />
        <Route path={path.REGISTERSUCCESS} element={<RegisterSuccess />} />
        <Route path={path.PARTNERSHIP} element={<Partnership />} />
        <Route path={path.PARTNERHOME} element={<PartnerHome />} />
        <Route path={path.PARTNERACCOUNT} element={<PartnerAccount />} />
        <Route path={path.PARTNERHEADER} element={<PartnerHeader />} />
        <Route path={path.PARTNERORDER} element={<PartnerOrder />} />
        <Route path={path.PARTNERREVENUE} element={<PartnerRevenue />} />
        <Route path={path.PARTNERROOM} element={<PartnerRoom />} />
        <Route path={path.PARTNERONPROGRESS} element={<PartnerOnProgress />} />
        <Route path={path.PARTNERREVIEW} element={<PartnerReview />} />
        <Route path={path.PARTNERINSERTROOM} element={<PartnerInsertRoom />} />

        <Route path={path.DETAILHOTEL} element={<DetailHotel />} />
        <Route path={path.SHOWALLHOTEL} element={<ShowAllHotel />} />
        <Route path={path.ORDER} element={<Orders />} />
        <Route path={path.ADMIN} element={<Admin />} />
        <Route path={path.VERIFIED} element={<Verified />} />
        <Route path={path.VERIFIEDPART} element={<VerifiedPart />} />
        <Route path={path.PARTNERINSERT} element={<PartnerInsert />} />
        <Route path={path.CHANGINFOUSER} element={<ChangeInfoUser />} />
        <Route path={path.ORDER} element={<Orders />} />
        <Route path={path.BOOKINGHISTORY} element={<BookingHistory />} />
        <Route path={path.FAVORITE} element={<Favorite />} />
        <Route path={path.REVIEWS} element={<Reviews />} />
        <Route path={path.SHOWREVIEWS} element={<ShowReviews />} />
      </Routes>
    </div>
  );
}

export default App;
