import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-gray-50 max-w-inner-width w-full mx-auto">
      <section className="py-32 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
            <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
              <div className="pr-6">
                <h1 className="mb-6 text-primary text-2xl font-bold md:text-4xl lg:mb-10 lg:text-5xl">
                  Our Story
                </h1>
                <p className="mb-9 lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  alias repellendus perferendis earum facilis est soluta
                  consequatur placeat hic aliquid exercitationem, ex molestias
                  nam veniam distinctio maxime culpa magnam autem.
                </p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique dolore quas placeat expedita aliquam rerum tempore
                  amet, sequi ipsa ad quam, adipisci exercitationem nihil,
                  sapiente laborum minus doloribus consequuntur sed. Quo
                  repudiandae nihil quas voluptates, aut beatae reiciendis
                  aliquid perspiciatis quae explicabo inventore temporibus
                  laborum, nostrum omnis quos excepturi dolorum reprehenderit
                  vel labore eaque libero perferendis? Qui illo numquam beatae?
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-6 md:flex-row w-full">
                <div className="relative aspect-[7/10] w-full md:w-1/2">
                  <Image
                    src="https://themedevhub-images.netlify.app/components/images/about-2.webp"
                    alt="about 1"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                  <div className="relative aspect-[11/10] w-full">
                    <Image
                      src="https://themedevhub-images.netlify.app/components/images/about-2.webp"
                      alt="about 2"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="relative aspect-[7/10] w-full">
                    <Image
                      src="https://themedevhub-images.netlify.app/components/images/about-2.webp"
                      alt="about 3"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
              <div className="flex flex-col items-center justify-center gap-6 md:flex-row w-full">
                <div className="relative aspect-[9/10] w-full md:w-1/2">
                  <Image
                    src="https://themedevhub-images.netlify.app/components/images/about-2.webp"
                    alt="about 4"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                  <div className="relative aspect-[8/10] w-full">
                    <Image
                      src="https://themedevhub-images.netlify.app/components/images/about-2.webp"
                      alt="about 5"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="relative aspect-[9/10] w-full">
                    <Image
                      src="https://themedevhub-images.netlify.app/components/images/about-2.webp"
                      alt="about 6"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
              <div className="px-8">
                <h1 className="mb-8 text-primary text-2xl font-semibold lg:mb-6">
                  Our Workplace
                </h1>
                <p className="mb-9 lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit quae vel rem tenetur illum aspernatur. Ea, facere
                  soluta cumque laboriosam repudiandae quaerat inventore dolores
                  saepe pariatur, adipisci atque voluptate doloribus!
                </p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
                  aliquid laudantium minus distinctio exercitationem odio non
                  nihil blanditiis quae, beatae assumenda ad reiciendis soluta
                  dolorem. Natus repellendus quidem dolorum temporibus!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
