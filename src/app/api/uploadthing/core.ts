import { uploadFile } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user.userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      await uploadFile({
        file: {
          file_id: file.name,
          filename: file.name,
          type: file.type, // e.g., "image/png"
          size: file.size.toString(), // Convert size to string
          parentId: "/", // Assuming root for simplicity, adjust as needed
          url: file.ufsUrl, // URL to access the file
          modified: new Date().toISOString(), // Last modified date
          starred: false, // Default value, adjust as needed
        },
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// // ==============

// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// import { handleFileUpload } from "@/server/db/schema";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async () => {
//       const user = await auth();
//       // eslint-disable-next-line @typescript-eslint/only-throw-error
//       if (!user.userId) throw new UploadThingError("Unauthorized");
//       return { userId: user.userId };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       try {
//         await handleFileUpload({
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           url: file.url,
//           userId: metadata.userId,
//         });

//         return { uploadedBy: metadata.userId };
//       } catch (error) {
//         console.error("Upload error:", error);
//         // eslint-disable-next-line @typescript-eslint/only-throw-error
//         throw new UploadThingError("Failed to process upload");
//       }
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
