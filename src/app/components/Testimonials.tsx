export default function Testimonials() {
    const testimonials = [
      {
        id: 1,
        content: "The quality of these bags is unmatched. I've never owned a more beautiful and functional piece.",
        author: "Sarah J.",
      },
      {
        id: 2,
        content: "Exceptional craftsmanship and attention to detail. These bags are truly works of art.",
        author: "Emily R.",
      },
      {
        id: 3,
        content: "I love how versatile these bags are. Perfect for both casual outings and formal events.",
        author: "Sophia L.",
      },
    ];
  
    return (
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <p className="text-gray-900 font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }