import React, { useState } from "react";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect the form data
   

    try {
      const response = await fetch("http://localhost/TABBE3NI/API/send_mail.php", { // Ensure the correct path to your PHP file
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name: name, 
          email: email,
          message: message,
        })
      });

      const result = await response.json();
      if (result.success) {
        setSuccess("Your message has been sent successfully!");
        setError(null);
        setSubmitted(true);
      } else {
        setError("There was a problem sending your message.");
        setSuccess(null);
      }
    } catch (err) {
      console.log(err)
      setError("An error occurred. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <Link to={"/"} className="flex no-underline items-center gap-2 text-black hover:text-purple-600 font-bold font-mono text-lg group">
          <IoReturnUpBackSharp className="group-hover:text-purple-600" />
          <span className="group-hover:text-purple-600">Home</span>
        </Link>
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">Contact Us</h1>
        <p className="text-center mb-8 text-gray-600">
          Have questions or feedback? Reach out to us using the form below or through our contact information.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold mb-2">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-2">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label htmlFor="message" className="text-sm font-semibold mb-2">Your Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Type your message here..."
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Success/Error Messages */}
        {submitted && success && <div className="mt-4 text-green-500">{success}</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}

        {/* Contact Info */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Contact Information</h2>
          <ul className="space-y-4 text-gray-600">
            <li>
              <span className="font-bold text-gray-800">Address:</span> campus El Manar
            </li>
            <li>
              <span className="font-bold text-gray-800">Email:</span>{" "}
              <a href="mailto:support@example.com" className="text-purple-600 hover:underline">
                support@example.com
              </a>
            </li>
            <li>
              <span className="font-bold text-gray-800">Phone:</span>{" "}
              <a href="tel:+123456789" className="text-purple-600 hover:underline">
                +123 456 789
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
