using Azure.Identity;
using Azure.Storage.Blobs;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Infrastructure.Persistence;

namespace Videoteka.Infrastructure.Services;

public class VideoService : IVideoService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly ApplicationDbContext _context;

    // For now all videos go into one container for simplicity
    private BlobContainerClient _blobContainerClient;

    public VideoService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;

        var blobServiceUriString = configuration.GetValue<string>("blobServiceUri");
        var videoContainerName = configuration.GetValue<string>("videoContainerName");

        _blobServiceClient = new BlobServiceClient(
            new Uri(blobServiceUriString),
            new DefaultAzureCredential()
        );
        _blobContainerClient = EnsureBlobContainer(videoContainerName);
    }

    public async Task<Stream> GetVideoStream(Video video, CancellationToken cancellationToken)
    {
        var blobClient = _blobContainerClient.GetBlobClient(video.Name);

        var azureStream = await blobClient.DownloadStreamingAsync();

        return azureStream.Value.Content;
    }

    public async Task StoreVideo(Byte[] video, string videoName, CancellationToken cancellationToken)
    {
        var blobClient = _blobContainerClient.GetBlobClient(videoName);

        var binaryData = new BinaryData(video);

        await blobClient.UploadAsync(binaryData, cancellationToken);
    }

    private BlobContainerClient EnsureBlobContainer(string containerName)
    {
        var containers = _blobServiceClient.GetBlobContainers();

        foreach (var container in containers)
        {
            if (container.Name == containerName)
            {
                return _blobServiceClient.GetBlobContainerClient(containerName);
            }
        }

        return _blobServiceClient.CreateBlobContainer(containerName);
    }
}