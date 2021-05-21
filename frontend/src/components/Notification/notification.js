import Notifications from "react-notifications-menu";

const Noti = () => {
  const data = [
    {
      image: logo,
      message: "Kameshwaran S had shared a feedback with you.",
      detailPage: "/",
    },
    {
      image: logo,
      message: (
        <p>
          Kameshwaran S had shared a{" "}
          <span style={{ color: "#7ac2fa" }}>feedback</span> with you.
        </p>
      ),
      detailPage: "/",
    },
  ];
  return;
  <Notifications
    data={data}
    header={{
      title: "Notifications",
      option: { text: "View All", onClick: () => console.log("Clicked") },
    }}
    classNamePrefix="okrjoy"
    icon={bell}
  />;
};
