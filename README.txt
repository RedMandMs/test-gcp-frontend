- To deploy on App Engine (Google cloude SDK Shell):

$ gcloud app deploy



- To deploy on Compute Engine (Google cloude SDK Shell):

create compute engine instance:
$ gcloud compute instances create my-app-instance ^
    --image-family=debian-8 ^
    --image-project=debian-cloud ^
    --machine-type=g1-small ^
    --scopes userinfo-email,cloud-platform ^
    --metadata-from-file startup-script=startup-script.sh ^
    --zone us-central1-f ^
    --tags http-server
in "startup-script.sh" replace "git clone https://github.com/RedMandMs/test-gcp-frontend.git" by your url.

Check the progress of the instance creation:
gcloud compute instances get-serial-port-output my-app-instance --zone us-central1-f
If the startup script has completed, you will see "Finished running startup script" near the end of the command output.

Create a firewall rule to allow traffic to your instance:
gcloud compute firewall-rules create default-allow-http-8000 ^
    --allow tcp:8000 ^
    --source-ranges 0.0.0.0/0 ^
    --target-tags http-server ^
    --description "Allow port 8000 access to http-server"



- To start local:
$ npm install
$ node app.js