
import styles from "./Carousel.module.css"

const testimonials = Array.from({ length: 30 }, (_, i) => ({
  quote: `“This is testimonial #${i + 1}. Indorve helped me massively!”`,
}))

const motivationalQuotes = [
  "💡 “Believe you can and you're halfway there.” — Theodore Roosevelt",
  "🔥 “Your limitation—it's only your imagination.”",
  "💪 “Push yourself, because no one else is going to do it for you.”",
  "🚀 “Great things never come from comfort zones.”",
  "🎯 “Dream it. Wish it. Do it.”",
  "🏃‍♂️ “Success doesn't just find you. You have to go out and get it.”",
  "🌟 “The harder you work for something, the greater you'll feel when you achieve it.”",
  "⏰ “Don't watch the clock; do what it does. Keep going.” — Sam Levenson",
  "🛑 “Success is what comes after you stop making excuses.”",
  "🌅 “Wake up with determination. Go to bed with satisfaction.”",
  "📝 “Do something today that your future self will thank you for.”",
  "🔍 “Little things make big days.”",
  "🏔 “It’s going to be hard, but hard does not mean impossible.”",
  "🛠 “Don’t wait for opportunity. Create it.”",
  "🧠 “Sometimes we're tested not to show our weaknesses, but to discover our strengths.”",
  "🎯 “The key to success is to focus on goals, not obstacles.”",
  "🚫💭 “Doubt kills more dreams than failure ever will.” — Suzy Kassem",
  "⚡ “Don’t limit your challenges. Challenge your limits.”",
  "🌱 “You don’t have to be great to start, but you have to start to be great.” — Zig Ziglar",
  "🏁 “It always seems impossible until it’s done.” — Nelson Mandela",
  "🌍 “Act as if what you do makes a difference. It does.” — William James",
  "🎉 “You are never too old to set another goal or to dream a new dream.” — C.S. Lewis",
  "🏋️ “Hard work beats talent when talent doesn’t work hard.” — Tim Notke",
  "📈 “Success usually comes to those who are too busy to be looking for it.” — Henry David Thoreau",
  "🛌 “If you get tired, learn to rest, not to quit.” — Banksy"
];


export default function Carousel() {
  const duplicated = testimonials.concat(testimonials)

  return (
    <div className={`w-full overflow-hidden py-6 ${styles.wrapper}`}>
      <div className={styles.row}>
        <div className={`${styles.track} ${styles.left}`}>
          {motivationalQuotes.map((t) => (
            <div key={t} className={styles.card } data-fulltext={t}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
