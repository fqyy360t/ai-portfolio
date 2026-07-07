export default function Stats() {
  const stats = [
    { value: '10+', label: '精品作品', desc: '独立完成的项目' },
    { value: '30+', label: '创意工具案例', desc: 'AI 工具实践' },
    { value: '5+', label: '获奖证书', desc: '专业认证荣誉' },
    { value: '100+', label: '文章分享', desc: '技术博客与教程' },
  ]
  
  return (
    <section className="section">
      <div className="container">
        <div className="cards-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="card">
              <div className="card-num">{stat.value}</div>
              <h3>{stat.label}</h3>
              <p>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}