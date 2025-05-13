import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

export function CardNormal() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">HeroUI</p>
          <p className="text-small text-default-500">heroui.com</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/heroui-inc/heroui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}

//for testing purpose
export function CardSimple({ item }) {
  return (
    <Card className="font-poppin">
      <CardBody>
        <p className="text-primary">
          {`id: ${item?.createdBy}` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p className=" text-gradient text-4xl font-bold">
          {`title: ${item?.title}` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p className="text-slate-purple-more">
          {`description: ${item?.description}` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p className="text-description text-body-lg ">
          {`${item?.updatedAt} members` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p className="font-khmer text-h1 text-gradient">សួស្ដី</p>
      </CardBody>
    </Card>
  );
}

export function CardSimpleBySignleId({ itembyid }) {
  return (
    <Card>
      <CardBody>
        <p>
          {`id: ${itembyid?.createdBy}` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p>
          {`title: ${itembyid?.title}` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p>
          {`description: ${itembyid?.description}` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
        <p>
          {`${itembyid?.updatedAt} members` ||
            " Make beautiful websites regardless of your design experience."}
        </p>
      </CardBody>
    </Card>
  );
}
