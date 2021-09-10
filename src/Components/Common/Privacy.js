import { Container, makeStyles, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  text: {
    marginTop: "20px",
    textAlign: "justify",
  },
});

const Privacy = () => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <h1 className={classes.title}>Privacy & Policy</h1>
        <Divider />
        <p className={classes.text}>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit the “Site”.
        </p>
        <h2 className={classes.text}>Personal Information We Collect</h2>
        <Divider />
        <p className={classes.text}>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as “Device Information.”
        </p>
        <p className={classes.text}>
          We collect Device Information using the following technologies:
        </p>
        <ul>
          <li className={classes.text}>
            “Cookies” are data files that are placed on your device or computer
            and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit{" "}
            <a
              href="http://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.allaboutcookies.org
            </a>
          </li>

          <li className={classes.text}>
            “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </li>
          <li className={classes.text}>
            “Web beacons,” “tags,” and “pixels” are electronic files used to
            record information about how you browse the Site.
          </li>
        </ul>
        <p className={classes.text}>
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </p>
        <h2 className={classes.text}>
          How do we use your personal information?
        </h2>
        <Divider />
        <p className={classes.text}>
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
        <h2 className={classes.text}>Sharing your personal information</h2>
        <Divider />
        <p className={classes.text}>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. For example, we use
          Google Analytics to help us understand how our customers use the
          Site&#8211;you can read more about how Google uses your Personal
          Information here:{" "}
          <a
            href="https://www.google.com/intl/en/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.google.com/intl/en/policies/privacy/
          </a>
          . You can also opt-out of Google Analytics here:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
        <h2 className={classes.text}>Behavioural Advertising</h2>
        <Divider />
        <p className={classes.text}>
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at{" "}
          <a
            href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
          </a>
        </p>
        <p className={classes.text}>
          You can opt out of targeted advertising by: <br />
          GOOGLE &#8211;{" "}
          <a
            href="https://www.google.com/settings/ads/anonymous"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.google.com/settings/ads/anonymous
          </a>
        </p>
        <p className={classes.text}>
          Additionally, you can opt out of some of these services by visiting
          the Digital Advertising Alliance’s opt-out portal at:{" "}
          <a
            href="http://optout.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://optout.aboutads.info/
          </a>
          .
        </p>
        <h2 className={classes.text}>Do not track</h2>
        <Divider />
        <p className={classes.text}>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </p>
        <h2 className={classes.text}>Changes</h2>
        <Divider />
        <p className={classes.text}>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
        <h2 className={classes.text}>Contact Us</h2>
        <Divider />
        <p className={classes.text}>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at surajabubakar443@gmail.com
        </p>
      </Container>
    </div>
  );
};

export default Privacy;
