using System.Drawing;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Infrastructure.Persistence;
using Accord.Video;
using FFmpeg.NET;

namespace Videoteka.Infrastructure.Services;

public class VideoService : IVideoService
{
    private readonly IConfiguration _configuration;
    private readonly BlobServiceClient _blobServiceClient;
    private readonly ApplicationDbContext _context;

    // For now all videos go into one container for simplicity
    private BlobContainerClient _blobContainerClient;

    public VideoService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;

        var connectionString = configuration.GetValue<string>("Azure:BlobStorage:ConnectionString");
        var containerName = configuration.GetValue<string>("Azure:BlobStorage:ContainerName");

        _blobServiceClient = new BlobServiceClient(connectionString);
        _blobContainerClient = EnsureBlobContainer(containerName);
    }

    public async Task<Stream> GetVideoStream(string name, CancellationToken cancellationToken)
    {
        var blobClient = _blobContainerClient.GetBlobClient(name);

        var azureStream = await blobClient.DownloadStreamingAsync();

        return azureStream.Value.Content;
    }

    public async Task StoreVideo(Stream video, string videoName)
    {
        var blobClient = _blobContainerClient.GetBlobClient(videoName);

        await blobClient.UploadAsync(video, overwrite: true);
    }

    public async Task DeleteVideoAsync(string blobName)
    {
        var blobClient = _blobContainerClient.GetBlobClient(blobName);

        await blobClient.DeleteAsync();
    }

    public string GetResourceUrl(string fileName)
    {
        var cdnUrl = _configuration.GetValue<string>("Azure:BlobStorage:CdnBaseUrl");

        return Path.Combine(cdnUrl, _blobContainerClient.Name, fileName);
    }
    public async Task<Stream> GetFirstFrame(Stream video, CancellationToken cancellationToken)
    {
        video.Position = 0;

        var inputFilePath = Path.GetTempFileName();
        var outputFilePath = Path.ChangeExtension(Path.GetTempFileName(), "jpg");

        using (var file = File.Create(inputFilePath))
        {
            await video.CopyToAsync(file);
        }

        File.Create(outputFilePath)
            .Close();

        var inputFile = new InputFile(inputFilePath);
        var outputFile = new OutputFile(outputFilePath);

        var ffmpeg = new Engine("/opt/homebrew/bin/ffmpeg");
        var options = new ConversionOptions { Seek = TimeSpan.FromSeconds(1) };
        await ffmpeg.GetThumbnailAsync(inputFile, outputFile, options, cancellationToken);

        var thumbnail = File.OpenRead(outputFilePath);

        DeleteFile(inputFilePath);
        DeleteFile(outputFilePath);

        return (Stream)thumbnail;
    }

    private void DeleteFile(string filePath)
    {
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
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