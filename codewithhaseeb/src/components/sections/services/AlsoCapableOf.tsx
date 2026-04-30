const capabilities = [
  'Computer vision (YOLO, segmentation)',
  'Web scraping (Scrapy, Playwright, anti-bot)',
  'Data engineering (ETL, dashboards, BI)',
  'Cloud and DevOps (AWS, GCP, Kubernetes)',
  'API design (REST, GraphQL, gRPC)',
];

export function AlsoCapableOf() {
  return (
    <section
      className="py-[56px] md:py-[88px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight max-w-[720px]">
        <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
          also capable of
        </p>

        <h2
          className="font-body text-[28px] md:text-[32px] leading-[1.2] mb-8"
          style={{ color: '#1D2020' }}
        >
          If you need one of these for a project we are already scoping, say so.
          Standalone engagements in these areas go through a referral partner.
        </h2>

        <div className="flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-[12px] font-body"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7E6E4',
                color: '#1D2020',
              }}
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
