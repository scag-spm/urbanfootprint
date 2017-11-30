# -*- mode: ruby -*-
# vi: set ft=ruby :

CALTHORPE_UID = 209
CALTHORPE_GID = 209
VAGRANT_COMMAND = ARGV[0]

# Allow user to override amount of memory allocated
# to VM via environment variable.
VM_MEMORY = ENV['UF_VM_MEMORY']  || 8192
VM_CPUS   = ENV['UF_VM_CPUS']    || 4
VM_PROXY  = ENV['VAGRANT_PROXY'] || false

Vagrant.configure(2) do |config|
  ############################################################################
  # GLOBAL SETTINGS
  ############################################################################
  config.vm.box     = "ubuntu/trusty64"

  config.vm.synced_folder ".", "/srv/calthorpe/urbanfootprint", owner: CALTHORPE_UID, group: CALTHORPE_GID

  config.vm.network "forwarded_port", guest: 80, host: 3333, host_ip: "localhost"
  config.vm.network "forwarded_port", guest: 5432, host: 5555, host_ip: "localhost"

  if VAGRANT_COMMAND == "ssh"
    config.ssh.username = "calthorpe"
  end

  config.ssh.forward_agent = true
  config.ssh.forward_x11 = true

  config.vm.provider "virtualbox" do |vb|
    vb.memory = VM_MEMORY
    vb.cpus   = VM_CPUS
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end
  ############################################################################

  ############################################################################
  # VIRTUALBOX
  ############################################################################
  config.vm.define "urbanfootprint" do |subvm|
    subvm.vm.hostname = "urbanfootprint"
    # TODO:
    #   Ansible provisioning is called from within VM due to error with
    #   ansible and vagrant on windows hosts:
    #     https://github.com/mitchellh/vagrant/issues/6793
    #   This should be fixed with the release of vagrant 1.8.2
    subvm.vm.provision "shell", inline:
      "apt-get install software-properties-common;
       apt-add-repository ppa:ansible/ansible-1.9;
       apt-get update;
       apt-get install -y ansible git;
       cd /srv/calthorpe/urbanfootprint/provisioning;
       ansible-galaxy install -f -r galaxy-roles.yml;
       ansible-playbook -v -i 'localhost', -c local site.yml;"

    # After ansible has run, copy the vagrant user's list of authorized_keys to
    # the calthorpe user so  we can easily ssh in as calthorpe user for pycharm.
    config.vm.provision "shell", inline:
      "mkdir -p /home/calthorpe/.ssh && \
       cp /home/vagrant/.ssh/authorized_keys /home/calthorpe/.ssh/authorized_keys && \
       chown #{CALTHORPE_UID}:#{CALTHORPE_GID} /home/calthorpe/.ssh/authorized_keys"
  end
  ############################################################################

  ############################################################################
  # PROXY SETTINGS
  ############################################################################
  if Vagrant.has_plugin?("vagrant-proxyconf")
    config.proxy.http     = VM_PROXY
    config.proxy.https    = VM_PROXY
    config.proxy.no_proxy = VM_PROXY && "localhost,127.0.0.1,.example.com"
  end
  ############################################################################

end
