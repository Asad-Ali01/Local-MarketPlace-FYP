import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Rate } from "antd";

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Ali Ahmed",
      avatar: "",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent work! The project was completed before the deadline and exceeded my expectations. Communication was smooth throughout the process.",
    },
    {
      id: 2,
      name: "John Smith",
      avatar: "",
      rating: 5,
      date: "1 month ago",
      comment:
        "Very professional developer. Delivered exactly what I requested. Highly recommended.",
    },
    {
      id: 3,
      name: "Sara Khan",
      avatar: "",
      rating: 4,
      date: "2 months ago",
      comment:
        "Good quality work with excellent communication. Would definitely hire again.",
    },
  ];

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold">Customer Reviews</h2>

      {/* Rating Summary */}

      <Card>
        <CardContent className="p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left */}

            <div className="flex flex-col items-center justify-center">
              <h1 className="text-6xl font-bold">4.9</h1>

              <Rate disabled defaultValue={5} />

              <p className="mt-3 text-gray-500">
                Based on 120 Reviews
              </p>
            </div>

            {/* Right */}

            <div className="space-y-4">
              {[
                { star: 5, percent: 92 },
                { star: 4, percent: 6 },
                { star: 3, percent: 1 },
                { star: 2, percent: 1 },
                { star: 1, percent: 0 },
              ].map((item) => (
                <div
                  key={item.star}
                  className="flex items-center gap-4"
                >
                  <span className="w-12 text-sm">
                    {item.star} Star
                  </span>

                  <Progress
                    value={item.percent}
                    className="flex-1"
                  />

                  <span className="w-10 text-sm text-gray-500">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.avatar} />

                  <AvatarFallback>
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {review.name}
                      </h3>

                      <Rate
                        disabled
                        defaultValue={review.rating}
                        style={{ fontSize: 15 }}
                      />
                    </div>

                    <span className="text-sm text-gray-500">
                      {review.date}
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-gray-600">
                    {review.comment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}