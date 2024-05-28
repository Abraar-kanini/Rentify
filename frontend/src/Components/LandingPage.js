import React, { useEffect, useState } from "react";

function LandingPage() {
  const [natureImages, setNatureImages] = useState([]);

  useEffect(() => {
    fetchNatureImages();
  }, []);

  const fetchNatureImages = async () => {
    try {
      const response = await Promise.all([
        fetch("https://picsum.photos/800/600?random=1"),
        fetch("https://picsum.photos/800/600?random=2"),
        fetch("https://picsum.photos/800/600?random=3"),
        fetch("https://picsum.photos/800/600?random=4"),
    ]);
    

      const imageUrls = await Promise.all(response.map((res) => res.url));
      setNatureImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
    
        <div className="landing-page">
          <section id="hero" className="hero bg-gray-100 py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <h1 className="text-4xl font-bold mb-4">
                    Welcome to Rentify
                  </h1>
                  <p className="text-lg text-gray-700 mb-8">
                    About Us, Welcome to Rentify, your ultimate destination for
                    finding the perfect rental property! At Rentify, we
                    understand the importance of finding a place that feels like
                    home, and that's why we've curated a comprehensive selection
                    of rental listings tailored to your needs. Whether you're
                    searching for a cozy apartment in the heart of the city, a
                    spacious family home in the suburbs, or a luxurious
                    penthouse with breathtaking views, Rentify has you covered.
                    With detailed listings showcasing key features such as rent
                    prices, the number of bedrooms and bathrooms, and amenities
                    like car parking, you can easily find the ideal property to
                    suit your lifestyle. Say goodbye to endless scrolling and
                    let Rentify simplify your search for the perfect rental
                    home. Start exploring today and discover your next dream
                    rental with Rentify!
                  </p>
                  <a href="#appointment" className="btn btn-primary">
                    Book an Appointment
                  </a>
                </div>
                <div>
                  <img
                    src={natureImages[0]}
                    alt="Hospital"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="about py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Why Rentify?</h2>
                  <p className="text-lg text-gray-700">
                    Welcome to Rentify, your premier destination for hassle-free
                    property rentals! At Rentify, we're dedicated to simplifying
                    the rental process and connecting you with your dream home.
                    Our platform offers an extensive range of rental properties,
                    from cozy studios to spacious family homes and everything in
                    between. With Rentify, you can browse listings that include
                    detailed information such as rental prices, the number of
                    bedrooms and bathrooms, and essential amenities like car
                    parking.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                  <ul className="text-lg text-gray-700">
                    <li>Property Management Services</li>
                    <li>Interior Design and Styling</li>
                    <li>Eco-Friendly Home Solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="natures" className="natures bg-gray-100 py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Our natures</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="nature-card bg-white p-8 rounded-lg">
                  <img
                    src={natureImages[1]}
                    alt="nature"
                    className="img-fluid mb-4"
                  />
                  <h4 className="text-xl font-bold mb-4">
                    Cozy Studio Apartment:
                  </h4>
                  <p className="text-gray-700">
                    Welcome to your cozy retreat in the heart of the city! This
                    charming studio apartment offers a perfect blend of comfort
                    and convenience. Ideal for urban professionals or students,
                    this compact yet stylish space features an open floor plan
                    with ample natural light, creating a warm and inviting
                    atmosphere. The apartment comes fully furnished with modern
                    amenities, including a sleek kitchenette, a comfortable
                    living area, and a well-appointed bathroom. With its central
                    location and proximity to public transportation,
                    restaurants, and entertainment options, this studio
                    apartment is the perfect urban oasis for those seeking a
                    convenient and vibrant lifestyle.
                  </p>
                </div>
                <div className="nature-card bg-white p-8 rounded-lg">
                  <img
                    src={natureImages[2]}
                    alt="nature"
                    className="img-fluid mb-4"
                  />
                  <h4 className="text-xl font-bold mb-4">
                    Family-Friendly Townhouse
                  </h4>
                  <p className="text-gray-700">
                    Discover the perfect family home in this spacious townhouse
                    nestled in a quiet residential neighborhood. With three
                    bedrooms, two bathrooms, and ample living space spread
                    across multiple levels, this townhouse offers plenty of room
                    for the whole family to spread out and relax. The main floor
                    features a bright and airy living room, a modern kitchen
                    with stainless steel appliances, and a cozy dining area
                    perfect for family meals. Upstairs, you'll find a spacious
                    master suite with a private ensuite bathroom, two additional
                    bedrooms, and a full bathroom. Outside, a private backyard
                    provides the perfect space for outdoor gatherings and
                    playtime. With its family-friendly layout and convenient
                    location close to schools, parks, and amenities, this
                    townhouse is the ideal place to call home for growing
                    families.
                  </p>
                </div>
                <div className="nature-card bg-white p-8 rounded-lg">
                  <img
                    src={natureImages[3]}
                    alt="nature"
                    className="img-fluid mb-4"
                  />
                  <h4 className="text-xl font-bold mb-4">
                    Luxurious Waterfront Villa
                  </h4>
                  <p className="text-gray-700">
                    Experience luxury living at its finest in this stunning
                    waterfront villa overlooking breathtaking views of the
                    ocean. Boasting five bedrooms, four bathrooms, and lavish
                    amenities throughout, this palatial residence offers an
                    unparalleled level of comfort and sophistication. The grand
                    foyer welcomes you into the home, where you'll find
                    expansive living areas, including a formal dining room, a
                    gourmet kitchen with top-of-the-line appliances, and a
                    spacious family room with panoramic views of the water. The
                    master suite is a true sanctuary, featuring a private
                    balcony, a luxurious ensuite bathroom with a soaking tub,
                    and a spacious walk-in closet. Outside, the sprawling
                    grounds offer resort-style amenities, including a sparkling
                    infinity pool, a private dock, and lush landscaped gardens.
                    With its exquisite design, unparalleled views, and luxurious
                    amenities, this waterfront villa is the epitome of coastal
                    living and luxury lifestyle
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="appointment" className="appointment py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">Book an Appointment</h2>
              <p className="text-lg text-gray-700 mb-8">
                To book an appointment, please call: <strong>8870465119</strong>
              </p>
            </div>
          </section>

          <section id="contact" className="contact bg-gray-100 py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="mb-4">
                    Address: 123 Main Street, City, State, Country
                  </p>
                  <p>Email: jabraar01@gmail.com</p>
                </div>
                <div className="text-center">
                  <p className="mb-4">Phone: 8870465119</p>
                  <p>Working Hours: Monday - Friday, 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
      
    </>
  );
}

export default LandingPage;
