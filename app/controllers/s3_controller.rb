class S3Controller < ApplicationController
  def sign
    options = { path_style: true, region: ENV['AWS_REGION'] }
    headers = { 'Content-Type' => params[:contentType], 'x-amz-acl' => 'public-read' }

    url = FOG_CONNECTION.put_object_url(ENV['S3_BUCKET_NAME'],
                                        "user_uploads/#{SecureRandom.uuid}/#{params[:objectName]}",
                                        15.minutes.from_now.to_time.to_i, headers, options)

    respond_to do |format|
      format.json { render json: { signedUrl: url } }
    end
  end
end
