interface HeroProps {
    media?: string | { src: string; type: string }; 
    heading?: string;
}

export default function Hero({ media, heading }: HeroProps) {
    return (
        <section className="relative w-full h-screen flex items-center justify-center text-white text-3xl font-bold">
            {media ? (
                typeof media === "string" ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
                        style={{ backgroundImage: `url('${media}')`, backgroundAttachment: 'scroll' }}
                    />
                ) : (
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source src={media.src} type={media.type} />
                    </video>
                )
            ) : (
                <div
                    className="absolute inset-0 bg-cover bg-center md:bg-fixed"
                    style={{ backgroundImage: `url('${media}')`, backgroundAttachment: 'scroll' }}
                />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 p-4 rounded-lg font-heading">
                <h1 className="md:text-6xl text-2xl">{heading || "Default Heading"}</h1>
            </div>
        </section>
    );
}
