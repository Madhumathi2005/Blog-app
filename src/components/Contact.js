import '../css/Contact.css';
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
const Contact = () => {
  const [email, setEmail] = useState("");  // For email input
  const [feedback, setFeedback] = useState("");  // For feedback input
  const [subscribedEmails, setSubscribedEmails] = useState([]);  // Store subscribed emails

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle feedback input change
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  // Fetch stored emails from localStorage on page load
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    setSubscribedEmails(storedEmails);
  }, []);

  // Handle the subscription action
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && feedback) {
      const subject = "Subscription Confirmation";
      const body = `Thank you for subscribing to our service!\n\nFeedback:\n${feedback}`;

      // Save the email to localStorage
      const newSubscribedEmails = [...subscribedEmails, email];
      setSubscribedEmails(newSubscribedEmails);
      localStorage.setItem("subscribedEmails", JSON.stringify(newSubscribedEmails));

      // Open Gmail compose window with the email and feedback
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      // Clear the input fields
      setEmail("");  // Clear the email input
      setFeedback("");  // Clear the feedback input
    } else {
      alert("Please provide both email and feedback.");
    }
  };

  return (
    <div>
      <Navbar />
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">Subscribe to our newsletter</p>
      <form className="contact-form" onSubmit={handleSubscribe}>
        <div className="input-group">
          <label className="input-label">Email: </label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Feedback: </label>
          <textarea
            className="input-field"
            placeholder="Enter your feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Subscribe</button>
      </form>

      {/* Display the list of subscribed emails */}
      <div className="subscribed-emails">
        <h2>Subscribed Emails</h2>
        <ul>
          {subscribedEmails.length > 0 ? (
            subscribedEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))
          ) : (
            <p>No one has subscribed yet.</p>
          )}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Contact;
